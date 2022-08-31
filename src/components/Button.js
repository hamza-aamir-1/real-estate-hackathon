import React from 'react';
import {Button} from 'react-native-paper';

export default function CustomButton(props) {
  return (
    <Button mode="contained" {...props}>
      {props.children}
    </Button>
  );
}