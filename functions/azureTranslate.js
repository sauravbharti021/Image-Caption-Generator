import axios from 'axios'

export const handler = async(event)=>{

    try{
        let translate_api_key = process.env.VITE_AZURECV_TRANSLATE_APIKEY
        let query= event.body
        let config = {
            method: 'POST',
            url: 'https://api.cognitive.microsofttranslator.com/translate',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': translate_api_key,
                'Ocp-Apim-Subscription-Region': 'centralindia',
            },
            params: {
                'api-version': '3.0',
                'from': 'en',
                'to': 'hi'
            },
            data : [{
                'text': query
            }],
            responseType : 'json'
        }

        const response = await axios(config).then((data)=>{return data}).catch(err=> {throw new Error("Error in fetching in axios")})

        return {
            statusCode: 200,
            body: response.data[0].translations[0].text
        }
    }catch(err){
        console.log(err, "error while translating")
        return {
            statusCode: 404,
            body: err.stack
        }
    }
}