
import React from 'react';
import { Text } from '../text';
import { Icons } from '../icons';
import { TabContext } from './tabcontext';
import { TabList } from './tablist';
import { Tab } from './tab';
import { TabPanel } from './tabpanel';

export const TabListDemo = () => {

    const [value, setValue] = React.useState(1);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <TabList onChange={handleChange} aria-label='simple tabs example'>
                <Tab icon={<Icons.CheckCircle fontSize={4} />} value={1} label="Item One" />
                <Tab icon={<Icons.CheckCircle fontSize={4} />} value={2} label="Item Two" />
                <Tab icon={<Icons.CheckCircle fontSize={4} />} value={3} label="Item Three" />
            </TabList>
            <TabPanel value={1}><Text>Content for Item One</Text></TabPanel>
            <TabPanel value={2}><Text>Content for Item Two</Text></TabPanel>
            <TabPanel value={3}><Text>Content for Item Three</Text></TabPanel>
        </TabContext>
    );
}