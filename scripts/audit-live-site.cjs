'use strict';
const https=require('node:https'),fs=require('node:fs');
const url='https://gcm-gestionale.github.io/gcm-commerciale/';
https.get(url,{headers:{'User-Agent':'GCM-Commercial-ReadOnly-Audit/1.0'},timeout:12000},res=>{
 let b='',n=0;
 res.on('data',x=>{n+=x.length;if(n>150000){res.destroy(new Error('body too large'));return}b+=x.toString('utf8')});
 res.on('end',()=>{
  const report={url,statusCode:res.statusCode,bytes:n,hasGcmHeading:b.includes('Gestionale Cinofilia Multifunzione'),hasExistingRelease:b.includes('GCM_Setup_Windows_x64_224.1.32.exe'),note:'GET read-only, no GitHub Pages or Firebase changes'};
  fs.writeFileSync('gcm-commercial-live-check.json',JSON.stringify(report,null,2)+'\n');
  console.log(report);
  if(res.statusCode!==200||!report.hasGcmHeading)process.exitCode=1;
 });
 res.on('error',e=>{console.error(e);process.exitCode=1});
}).on('timeout',function(){this.destroy(new Error('timed out'))}).on('error',e=>{console.error(e);process.exitCode=1});
