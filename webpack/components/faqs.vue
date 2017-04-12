<template src="views/faqs.html"></template>

<script>
    import axios from 'axios';
    const config = require("config");
    export default {
        data () {
            return {
                faqs: []
            }
        },
        beforeRouteEnter (to, from, next) {
            axios.get(config.domain + "data/faqs.json")
                .then(response => {
                    next(vm => {
                        vm.faqs = response.data;
                    })
                })
                .catch(response => {
                    next(false)
                });
        },
        watch: {
            '$route' : 'fetchData'
        },
        methods: {
            fetchData () {
                axios.get(config.domain + "data/faqs.json").then(response => {
                    this.faqs = response;
                }, response => {
                    console.log("error", response);
                })
            }
        }
    }
</script>