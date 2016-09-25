<?php
    chdir('../');
    echo json_encode( glob('photos/*.*') );