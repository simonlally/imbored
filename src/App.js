import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  Text,
  Flex,
  Grid,
  Spinner,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const BASE_URL = 'https://www.boredapi.com/api';

function App() {
  const [loading, setLoading] = useState(false);
  const [activityData, setActivityData] = useState();

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(`${BASE_URL}/activity`);
    const data = await response.json();
    setActivityData(data);
    setLoading(false);
  };

  const Activity = ({ ...rest }) => {
    if (loading) {
      return (
        <Box mt={4}>
          <Spinner />
        </Box>
      );
    } else {
      return (
        <Box direction="column" {...rest}>
          <Text> {activityData?.activity}</Text>
        </Box>
      );
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <ColorModeSwitcher />
        <Grid minH="50vh" p={3}>
          <Flex direction="column" align="center" justify="center">
            <Button onClick={fetchData}>
              {loading ? 'Finding something cool' : 'Find an activity'}
            </Button>
            <Activity mt={6} />
          </Flex>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
