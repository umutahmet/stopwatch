# Stopwatch test

## Fixes

### Bindings
The main issue with the Stopwatch component is that the methods aren't bound to the class. This means they lack the class context, therefor they won't have access to any internal properties or methods. This can be fixed by binding them in the class constructor eg, `this.handleStartClick = this.handleStartClick.bind(this)` or by using a simpler and cleaner way with ES6 arrow methods eg, `handleStartClick = () => {}` giving the methods access to class properties and other methods via the lexical scope of the class. 

### Reactivity
Although the component will now work as expected, we are making unnecessary manual updates by updating the `laps` property. ReactJs is built for reactivity, so instead of making `laps` a property of the class, I would add it to the component state whereby any updates to the array will be reflected in the DOM automatically. Now that we have laps in the state, we would need to update the code so that opperations are made on the state and not the property. We can now remove `this.forceUpdate()` from our `handleLapClick()` method.

### Delete method
Given the above change, we would need to refactor the `handleDeleteClick` method and make use of the state instead. I would refactor this method by replacing the splice method and filtering the laps stored in state. This means we won't be doing any operations on the laps array directly and the updated array added to the state will cause the component to re-render accordingly.

### Component unmount
When the component unmounts from the DOM, we aren't clearing the interval that may still be running. This can cause memory leaks in the application so to counter this I would add the
`componentWillUnmount` lifecylce method and clear the interval here to prevent that fromm happening. 

### Typo
Small but confusing `handleLabClick` method is incorrectly named. 

### Further improvements
- Add interfaces for the class state and lap component
- Add types to all of the methods for consitancy and clarity 

## Going forward
If I had more time I would:
- Convert the class to a function
- Make use of react useState for state managament
- Create and extract statless components for the timer / button ui elements
- Move `formattedSeconds` helper function to another file
- Use `requestAnimationFrame` instead of `setInterval` for smoother rendering 
- Use `Map()` instead of `Array` to store the lap times to piggyback functionality such as `delete` instead of filtering.
