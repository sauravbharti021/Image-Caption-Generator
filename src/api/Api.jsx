import React from 'react';
import axios from 'axios';


export const Api = async(img) => {

    try{
        let api_key = import.meta.env.VITE_AZURECV_APIKEY
        let end_point= `${import.meta.env.VITE_AZURECV_ENDPOINT}computervision/imageanalysis:analyze?api-version=2023-10-01&features=caption&gender-neutral-caption=true`


        let config=  {

            method: 'POST',
            url:  end_point,
            headers: {
                'Content-Type' : 'application/octet-stream',
                'Ocp-Apim-Subscription-Key' : api_key
            },
            data: img,
        }

        return axios(config).then(data=>{return data}).catch(err => {console.log(err, "error in fetching")})
       

    }catch(err){
        console.log(err)
        res.status(400).json({
            message : err.message
        })
    }


};
