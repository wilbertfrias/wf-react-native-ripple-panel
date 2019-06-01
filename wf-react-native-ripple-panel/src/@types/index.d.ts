declare module 'wf-react-native-ripple-panel'
{
    import React from 'react';

    interface IPropsTypesPanel {
        rippleColor?: string,
        zIndex?: number,
        animationTime?: number,
        showSecondaryPanel?: boolean,
        secondaryPanel?: Element,
    }

    /**RipplePanel component
    * 
    */
    const RipplePanel: (props: IPropsTypesPanel) => React.PureComponent<IPropsTypesPanel>;
        
    export default RipplePanel;
}
