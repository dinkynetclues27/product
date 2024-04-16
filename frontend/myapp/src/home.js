import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadFile from './uploadfile';
import Fetchproduct from './fetchproduct';
import ExportFile from './exportfile';

const MainComponent = () => {


    return (
        <div>
            <UploadFile />
            <Fetchproduct />
            <ExportFile />
        </div>
    );
};

export default MainComponent;
