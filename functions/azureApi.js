
import axios from "axios"
export const handler = async(event) =>{

    try{
        let api_key = process.env.VITE_AZURECV_APIKEY
        let end_point= `${process.env.VITE_AZURECV_ENDPOINT}computervision/imageanalysis:analyze?api-version=2023-10-01&features=caption&gender-neutral-caption=true`
        
        let image = Buffer.from(event.body, 'base64');
        let config=  {
            
            method: 'POST',
            url:  end_point,
            headers: {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': api_key
            },
            data: image,
        }
        
        const response = await axios(config).then((data)=>{return data}).catch((err)=> {return err});

        
        let final= response.data.captionResult.text
        return {
            statusCode: 200,
            body: JSON.stringify({final}),
        };
       

    }catch(err){
       console.log("error while fetching")
       return {
        statusCode: 404,
        body: err.stack
       }
    }


};
