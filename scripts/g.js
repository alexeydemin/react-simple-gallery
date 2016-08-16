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
        return( <img
                 src = {filename}
                 onClick={this.handleClick}
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
        console.log('diriction='+dir);
        console.log('this.state.active='+this.state.active);
        if( dir == "right" ){
            this.setState( {active: this.state.active++} );
        } else {
            this.setState( {active: this.state.active--} );
        }
        console.log('this.state.active='+this.state.active);
        console.log('image='+this.state.images[this.state.active]);
    },
    componentWillMount: function() {
        this.loadImageList();
    },
    getInitialState: function() {
        return {images: [], active: 0 };
    },
    render: function () {
        return( <div>
                <Arrow
                    direction="left"
                    onUserClick={this.moveOn}
                />
                <Image path={this.state.images[this.state.active]}/>
                <Arrow
                    direction="right"
                    onUserClick={this.moveOn}
                />
                </div>);
    }
});
ReactDOM.render(
    <Gallery url="/api/photo.php" />,
    document.getElementById('content')
);