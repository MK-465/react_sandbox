import React from "react";

export const ControlledFlow = ({children, onFinish, currentIndex, onNext}) => {

    const goToNext = stepData => {
        onNext(stepData)
    }

    const currentChild: any = React.Children.toArray(children)[currentIndex];

    if (React.isValidElement(currentChild)) {
        return React.cloneElement(currentChild, {goToNext} as any)
    }

    return currentChild;

}