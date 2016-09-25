var Image = React.createClass({
render: function(){
    return(<img src={this.props.path} />
    );
}
});
var Arrow = React.createClass({
    handleClick: function() {
        this.props.onUserClick( this.props.direction );
    },
    render: function(){
        var filename = 'img/' + this.props.direction + '.png';
        //var styles = this.props.isHidden ? {visibility:"hidden"} : null;
        var styles = {cursor: "pointer", marginBottom: "200px"};
        return( <img
                 src = {filename}
                 onClick={this.handleClick}
                 //style={styles}
                />
        );
    },
});
var Gallery = React.createClass({
    loadImageList: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(images) {
                this.setState({images: images});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    moveOn: function(dir){
        var newActive = '';
        if( dir == "right" ){
            newActive = this.state.images[this.state.active + 1] ? this.state.active + 1 : 0;
        } else {
            newActive = this.state.images[this.state.active - 1] ? this.state.active - 1 : this.state.images.length - 1;
        }
        this.setState( {active: newActive } );
    },
    componentWillMount: function() {
        this.loadImageList();
    },
    getInitialState: function() {
        return {images: [], active: 0 };
    },
    //
    render: function () {
        return( <div>
                 <Arrow
                     direction="left"
                     onUserClick={this.moveOn}
                     //isHidden = {!this.state.images[this.state.active-1]}
                 />
                <Image path={this.state.images[this.state.active]}/>
                <Arrow
                    direction="right"
                    onUserClick={this.moveOn}
                    //isHidden = {!this.state.images[this.state.active+1]}
                />
                </div>);
    }
});
ReactDOM.render(
    <Gallery url="/api/photo.php" />,
    document.getElementById('content')
);