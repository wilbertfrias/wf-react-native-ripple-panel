# wf-react-native-ripple-panel
A ripple effect panel to sourround other components

Setup:
npm i wf-react-native-ripple-panel

Usage:
import RipplePanel from 'wf-react-native-ripple-panel';

//Surround your items

< RipplePanel>
    {your children} //Style them
< /RipplePanel>

Set the ripple color
< RipplePanel rippleColor={'red'}>

Set zIndex for the ripple //I had some issues with a native button, so it repaired it, early tests
< RipplePanel zIndex={1}>
