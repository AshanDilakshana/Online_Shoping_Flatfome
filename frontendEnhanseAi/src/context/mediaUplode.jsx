import { createClient } from "@supabase/supabase-js";


const AnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhdHdtcWp1aHJ5dGlzZGtpcWZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyOTI2NzEsImV4cCI6MjA3MTg2ODY3MX0.R6t_PG71nsyL6_NiVtInR2g4UQ5udCgqlLR9MsdIC0U";
const supperbaseUrl = "https://catwmqjuhrytisdkiqfk.supabase.co";


const supabase = createClient(supperbaseUrl, AnonKey); //connection to supperbase


function mediaUplode(file){
    return new Promise((resolve,reject)=>{
        if(file === null){
            reject("please select a file to uplode");
        }
        else{
            const timestamp = new Date().getTime();
            const filename = timestamp + file.name;
      
                supabase.storage
                .from('images')
                .upload(filename,file,{
                    upsert:false,
                    cacheControl:'3600',})
                .then (
                    ()=>{const publicUrl = supabase.storage
                        .from('images')
                        .getPublicUrl(filename).data.publicUrl;
                    
                        resolve(publicUrl);
                    })
                .catch(
                        ()=>{
                            reject(" error to uplode image");
                        })

            }
        });
}

export default mediaUplode; // export {mediaUplode};