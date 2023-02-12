import express from 'express';
import { PdfReader } from "pdfreader";
// import {filesystem} from 'fs';
import * as fs from 'fs';
import {readPdfText} from 'pdf-text-reader';


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
let arr= [];
const pdfread = () => {
    new PdfReader().parseFileItems("3170717.pdf", (err, item) => {
        if (err) console.error("error:", err);
        else if (!item) console.warn("end of file");
        else if (item.text){
            let j = item.text;
            // console.log(item.text); 
            arr.push(j)
    
        }
        console.log(arr) 
        fs.writeFile('data.txt', JSON.stringify(arr), (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;
        
            // success case, the file was saved
            console.log('data pushed!');
        });
      });
}
app.get('/',(req,res)=>{
  
    res.send('HELLO WORLD')
})
app.use(express.static('public'))
app.get('/j',(req,res)=>{
    let jsono = {
        hello: 'world',
        DS: 'DSD',
        hDSDello: 'woSDrld',
        FSF: 'woFDESFrld',
    }
    res.send(JSON.stringify(jsono))
})
app.post('/valdata',async (req,res)=>{
  try {
    let j = req.body;
    // console.log(req.body);
        let cr=[];
        const pages = await readPdfText(j.linkone);
        // console.log(pages[0]?.lines);
        cr.push(pages[0]?.lines)
        const pages2 = await readPdfText(j.linktwo);
        cr.push(pages2[0]?.lines)
        fs.writeFile('data.txt', JSON.stringify(cr), (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;
            // success case, the file was saved
            console.log('data pushed!');
            // let j = read();
            fs.readFile('data.txt', 'utf8' , async (err, data) => {
                if (err) {
                  console.error(err);
                  return
                }
                // console.log(JSON.stringify(data));
                // let str= (await JSON.stringify(data))
                let str1= (await JSON.stringify(cr));
                // console.log(str1);
                let str = str1.replace(/'|,|-|"|\\|..explain|what|[0-9]/gm, "")
                console.log(str);
                let occur = nthMostCommon(str, 1000);
                // console.log(occur);
                res.send(occur)
                            function nthMostCommon(str, amount) {
            
                            const stickyWords =[
                                "the",
                                "there",
                                "is",
                                "by",
                                "at",
                                "and",
                                "so",
                                "we",
                                "can",
                                "than",
                                "but",
                                "about",
                                "in",
                                "on",
                                "the",
                                "was",
                                "for",
                                "that",
                                "said",
                                "(a)",
                                "a",
                                "or",
                                "of",
                                "to",
                                "there",
                                "will",
                                "be",
                                "what",
                                "get",
                                "go",
                                "think",
                                "just",
                                "every",
                                "are",
                                "it",
                                "were",
                                "enrolment",
                                "had",
                                "i",
                                "very",
                                '\\",\\"(a)',
                                '\\",\\"(b)',
                                '\\",\\"(c)',
                                '\\",\\"(d)',
                                'what',
                                '________',
                                '04\\",\\"what',
                                'explain',
                                'how',
                                'with',
                                '2022\\",\\"subject',
                                'technological',
                                'no.___________\\",\\"\\",\\"gujarat',
                                '\\",\\"q.3',
                                'necessary.\\",\\"3.',
                                '04\\",\\"explain',
                                '03\\",\\"computing?\\",\\"what',
                                '(a)',
                                '(b)',
                                '(c)',
                                '(d)',
                                'no.___________gujarat',
                                'no.:',
                                'q.'
                                ];
                                str= str.toLowerCase();
                                var splitUp = str.split(/\s/);
                                const wordsArray = splitUp.filter(function(x){
                                return !stickyWords.includes(x) ;
                                        });
                                var wordOccurrences = {}
                                for (var i = 0; i < wordsArray.length; i++) {
                                    wordOccurrences['_'+wordsArray[i]] = ( wordOccurrences['_'+wordsArray[i]] || 0 ) + 1;
                                }
                                var result = Object.keys(wordOccurrences).reduce(function(acc, currentKey) {
                                    /* you may want to include a binary search here */
                                    for (var i = 0; i < amount; i++) {
                                        if (!acc[i]) {
                                            acc[i] = { word: currentKey.slice(1, currentKey.length), occurences: wordOccurrences[currentKey] };
                                            break;
                                        } else if (acc[i].occurences < wordOccurrences[currentKey]) {
                                            acc.splice(i, 0, { word: currentKey.slice(1, currentKey.length), occurences: wordOccurrences[currentKey] });
                                            if (acc.length > amount)
                                                acc.pop();
                                            break;
                                        }
                                    }
                                    return acc;
                                }, []);
                            
                                return result;
                                }
            
                    });
            
        });
  } catch (error) {
    console.log(err)
  }
    
    
})




const read = () => {
    // fs.readFile('data.txt', 'utf8' , async (err, data) => {
    //     if (err) {
    //       console.error(err);
    //       return
    //     }
    //     // console.log(JSON.stringify(data));
    //     let str= (await JSON.stringify(data))
    //     let occur = nthMostCommon(str, 1000);
    //     console.log(occur);
    //     // res.send(occur)
    //                 function nthMostCommon(str, amount) {
    
    //                 const stickyWords =[
    //                     "the",
    //                     "there",
    //                     "is",
    //                     "by",
    //                     "at",
    //                     "and",
    //                     "so",
    //                     "we",
    //                     "can",
    //                     "than",
    //                     "but",
    //                     "about",
    //                     "in",
    //                     "on",
    //                     "the",
    //                     "was",
    //                     "for",
    //                     "that",
    //                     "said",
    //                     "(a)",
    //                     "a",
    //                     "or",
    //                     "of",
    //                     "to",
    //                     "there",
    //                     "will",
    //                     "be",
    //                     "what",
    //                     "get",
    //                     "go",
    //                     "think",
    //                     "just",
    //                     "every",
    //                     "are",
    //                     "it",
    //                     "were",
    //                     "enrolment",
    //                     "had",
    //                     "i",
    //                     "very",
    //                     '\\",\\"(a)',
    //                     '\\",\\"(b)',
    //                     '\\",\\"(c)',
    //                     '\\",\\"(d)',
    //                     'what',
    //                     '________',
    //                     '04\\",\\"what',
    //                     'explain',
    //                     'how',
    //                     'with',
    //                     '2022\\",\\"subject',
    //                     'technological',
    //                     'no.___________\\",\\"\\",\\"gujarat',
    //                     '\\",\\"q.3',
    //                     'necessary.\\",\\"3.',
    //                     '04\\",\\"explain',
    //                     '03\\",\\"computing?\\",\\"what',
    //                     ];
    //                     str= str.toLowerCase();
    //                     var splitUp = str.split(/\s/);
    //                     const wordsArray = splitUp.filter(function(x){
    //                     return !stickyWords.includes(x) ;
    //                             });
    //                     var wordOccurrences = {}
    //                     for (var i = 0; i < wordsArray.length; i++) {
    //                         wordOccurrences['_'+wordsArray[i]] = ( wordOccurrences['_'+wordsArray[i]] || 0 ) + 1;
    //                     }
    //                     var result = Object.keys(wordOccurrences).reduce(function(acc, currentKey) {
    //                         /* you may want to include a binary search here */
    //                         for (var i = 0; i < amount; i++) {
    //                             if (!acc[i]) {
    //                                 acc[i] = { word: currentKey.slice(1, currentKey.length), occurences: wordOccurrences[currentKey] };
    //                                 break;
    //                             } else if (acc[i].occurences < wordOccurrences[currentKey]) {
    //                                 acc.splice(i, 0, { word: currentKey.slice(1, currentKey.length), occurences: wordOccurrences[currentKey] });
    //                                 if (acc.length > amount)
    //                                     acc.pop();
    //                                 break;
    //                             }
    //                         }
    //                         return acc;
    //                     }, []);
                    
    //                     return result;
    //                     }
    
    //         });
    
      }




app.listen('3000',(req,res)=>{
    console.log('server started')
});
// async function run() {
//     const pages = await readPdfText('3170717.pdf');
//     console.log(pages[0]?.lines);
//     cr.push(pages[0]?.lines)
//     const pages2 = await readPdfText('31707172.pdf');
//     cr.push(pages2[0]?.lines)
//     fs.writeFile('data.txt', JSON.stringify(cr), (err) => {
//         // throws an error, you could also catch it here
//         if (err) throw err;
//         // success case, the file was saved
//         console.log('data pushed!');
//         read();
//     });
// }

// run();
