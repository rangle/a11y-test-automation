import React from 'react';
import { StyledComponentProps } from 'styled-components';
import { TabContext, TabList, Tab, TabPanel, Text, Box} from '@rangleio/chord';

export type TabsProps = StyledComponentProps<
    'div', 
    any, 
    {
        initialTab: string;
    },
    never
>;

export const Tabs = (props: TabsProps ) => {

    const {
        initialTab = '1',
        ...other
    } = props;

    const [value, setValue] = React.useState(initialTab);
    const handleChange = (_: React.ChangeEvent<any>, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box {...other}>
            <TabContext value={value}>
                <TabList onChange={handleChange} aria-label='Demo Tabs'>
                    <Tab value={'1'} label='Tab 1' />
                    <Tab value={'2'} label='Tab 2' />
                    <Tab value={'3'} label='Tab 3' />
                </TabList>
                <TabPanel value={'1'}>
                    <Box>
                        <h2>TabPanel 1</h2>
                        <Text variant='body'>Tab Content</Text>
                    </Box>
                </TabPanel>
                <TabPanel value={'2'}>
                    <Box>
                        <h2>TabPanel 2</h2>
                        <Text variant='body'>Tab Content - This should show initially</Text>
                    </Box>
                </TabPanel>
                <TabPanel value={'3'}>
                    <Box>
                        <h2>TabPanel 3</h2>
                        <Text variant='body'>Tab Content</Text>
                    </Box>
                </TabPanel>
            </TabContext>
        </Box>
    );

}