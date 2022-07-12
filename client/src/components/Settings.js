import React, { useState } from 'react';
import SlideBar from "./SlideBar";
import { Fab, Drawer, Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const Settings = ({ updateArenaLength, arenaLength, isSettingsOpen, openSettings }) => {

    function toggleSettings() {
        openSettings(!isSettingsOpen)
    }

    return (
        <div>
            <div className='settings-button'>
                <Tooltip title="Settings">
                    <Fab color="primary" aria-label="add" onClick={toggleSettings}>
                        <SettingsIcon fontSize='large' />
                    </Fab>
                </Tooltip>
                <Drawer anchor={'right'}
                    open={isSettingsOpen}
                    onClose={toggleSettings}>
                    <div className='settings'>
                        <SlideBar
                            updateArenaLength={updateArenaLength}
                            arenaLength={arenaLength}
                        />
                    </div>
                </Drawer>
            </div>
        </div>
    )
}


export default Settings;