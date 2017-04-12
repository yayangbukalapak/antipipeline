<style src="css/items.css"></style>
<template src="views/items.html"></template>
<script>
    export default {
        data () {
            return {
                items: []
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                for(let $i = 1; $i <= 10; $i++) {
                    vm.items.push({
                        name: makeid(10),
                        description: makeid(100)
                    });
                }
            })
        },
        methods: {
            fetchData () {
                for(let $i = 1; $i <= 1000; $i++) {
                    this.items.push({
                        name: makeid(10),
                        description: makeid(100)
                    });
                }
            }
        }

    }

    function makeid(char)
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var char = (char == undefined) ? 5 : char;
        for( var i=0; i < char; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
</script>
