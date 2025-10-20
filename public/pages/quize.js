import{createApp, ref, onMounted} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'


createApp({
    data(){
        return{
            quize:[],
            userAns:{},
            submitted:false,
            rightAns:0,
            wrontAns:0,


        }
    },
    mounted(){
        console.log("Mounted")
    },
    created(){
        console.log("created")
        fetch('/data/quize.json')
            .then(response => response.json())
            .then(data=>{
                this.quize = data;

            })
            .catch(function (error){
                console.log(error);

            })
    },
    methods:{

        submitquiz(){
            this.rightAns =0;
            this.wrontAns = 0;
            this.submitted = true;

            this.quize.forEach((q,ind) =>{
                if (this.userAns[ind]===q.answer){
                    this.rightAns++;
                }
                else{
                    this.wrontAns++;
                }
            })
            //here disable all part of the questions and display the write and the wrong answer
        },
        retakeQuiz(){
            this.userAns={};
            this.submitted =false;
            this.rightAns = 0;
            this.wrontAns = 0;

        }

    }
}).mount("#main")
