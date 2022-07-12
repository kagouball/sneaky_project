import React, { useState } from 'react';
import SlideBar from "./SlideBar";
import { Fab, Drawer, Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const Settings = ({ updateArenaLength, arenaLength }) => {
    const [settings, openSettings] = useState(false);

    function toggleSettings() {
        openSettings(!settings)
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
                    open={settings}
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