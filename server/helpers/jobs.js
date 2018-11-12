import path from 'path';
import fs from 'fs';
import db from '../models';
import mysqldump from 'mysqldump';
import * as dotenv from 'dotenv';

dotenv.config();

let dumpFile= path.resolve('server/helpers', 'grooveng.sql');
let errorFile= path.resolve('server/helpers', 'errorlog.txt');






// function searchDb(){
//     db.Events.findAll()
//     .then((events)=>{
//         if(events.length<1){
//             console.log("no event was found");
//         }
//         console.log(events);
//     })
//     .catch((error)=>{
//         console.log(error);
//     })
// }

class Job{
    static async searchDb(){
        try {
           let events=  await db.Events.findAll();
            
        } catch (error) {
            let stream = fs.createWriteStream(errorFile,{'flags': 'a+'});
            stream.once('open', function(fd) {
            stream.write(error + ' in ' + __filename+' '+new Date() + "\n");
            stream.end();
            });
        }
       
    }


    static async backUpDb() {
        try {
            // if(process.env.NODE_ENV === 'development'){
            //     await mysqldump({
            //         connection: {
            //             host: process.env.DEV_DB_HOST,
            //             user: process.env.DEV_DB_USERNAME,
            //             password: process.env.DEV_DB_PASSWORD,
            //             database: process.env.DEV_DB_NAME,
            //         },
            //         dumpToFile: dumpFile,
            //     });
            // }
            // else if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod'){
                await mysqldump({
                    connection: {
                        host: process.env.DB_HOST,
                        user: process.env.DB_USERNAME,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME,
                    },
                    dumpToFile: dumpFile,
                });
            // }
           
        } catch (error) {
            let stream = fs.createWriteStream(errorFile,{'flags': 'a+'});
            stream.once('open', function(fd) {
            stream.write(error + ' in ' + __filename+' '+new Date() + "\n");
            stream.end();
            });
        }
      
    }
}

export default Job;