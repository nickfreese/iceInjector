# iceInjector
Dynamic content engine for time and url based injection


## Example config object

```var config = {
    0:{
        content: "<a href='#'>test link</a>",
        location: ["index.html"],
        time: {
            begin: [10, 27],
            end: [24, 60],
        },
        days: ['Thursday', 'Monday'],
        target: ['append', '.classOfTargetDiv'],
        callback: function(){
            alert('Callback for first Content Block');
        }
    },
}
```