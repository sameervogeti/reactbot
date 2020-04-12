'use strict'

const dialogflow=require('dialogflow')
const config=require('../config/keys')
const structjson=require('./structjson')

const projectId=config.googleProjectID
const credentials={
    client_email:config.googleClientEmail,
    private_key:config.googlePrivateKey
}
const sessionClient=new dialogflow.SessionsClient({projectId,credentials});



module.exports= {
textQuery: async function(text,userId,parameters={}){
    let sessionPath=sessionClient.sessionPath(config.googleProjectID,config.dialogFlowSessionID+userId)
    let self=module.exports
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: text,
                // The language used by the client (en-US)
                languageCode: config.dialogFlowSessionLanguageCode,
            },
        },
        queryParams:{
            payload:{
                data:parameters
            }
        }
    };
    let responses = await sessionClient.detectIntent(request)
    responses=self.handleAction(responses)
    return responses

},
    handleAction:function (responses) {
        return responses
    },
    eventQuery: async function(event,userId,parameters={}){
        let sessionPath=sessionClient.sessionPath(config.googleProjectID,config.dialogFlowSessionID+userId)
        let self=module.exports
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    // The query to send to the dialogflow agent
                    name: event,
                    parameters:structjson.jsonToStructProto(parameters),
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
            queryParams:{
                payload:{
                    data:parameters
                }
            }
        };
        let responses = await sessionClient.detectIntent(request)
        responses=self.handleAction(responses)
        return responses

    }
}