'use strict';
const https=require('node:https'),fs=require('node:fs');
const url='https://gcm-gestionale.github.io/gcm-commerciale/';
const fetchOnce=()=>new Promise((resolve,reject)=>{
 const req=https.get(url,{headers:{'User-Agent':'GCM-Commercial-ReadOnly-Audit/1.1','Cache-Control':'no-cache'},timeout:12000},res=>{
  const chunks=[];let n=0;
  res.on('data',x=>{n+=x.length;if(n>150000){req.destroy(new Error('body too large'));return}chunks.push(x)});
  res.on('end',()=>{const b=Buffer.concat(chunks).toString('utf8');resolve({
   statusCode:res.statusCode,bytes:n,hasGcmHeading:b.includes('Gestionale Cinofilia Multifunzione'),
   hasExistingRelease:b.includes('GCM_Setup_Windows_x64_224.1.32.exe'),
   showsV68Candidate:b.includes('224.1.33')&&b.includes('In collaudo: download non ancora disponibile'),
   exposesUnapprovedDownload:b.includes('/releases/download/v224.1.33/')
  })});
  res.on('error',reject);
 });req.on('timeout',()=>req.destroy(new Error('timed out')));req.on('error',reject);
});
(async()=>{
 let report;
 for(let attempt=1;attempt<=6;attempt++){
  report={url,attempt,...await fetchOnce()};
  console.log('Read-only site check',JSON.stringify(report));
  if(report.statusCode===200&&report.hasGcmHeading&&report.hasExistingRelease&&report.showsV68Candidate&&!report.exposesUnapprovedDownload)break;
  if(attempt<6)await new Promise(resolve=>setTimeout(resolve,8000));
 }
 fs.writeFileSync('gcm-commercial-live-check.json',JSON.stringify(report,null,2)+'\n');
 if(report.statusCode!==200||!report.hasGcmHeading||!report.hasExistingRelease||!report.showsV68Candidate||report.exposesUnapprovedDownload)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
