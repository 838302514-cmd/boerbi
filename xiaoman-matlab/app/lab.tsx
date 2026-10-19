'use client';
import { useState } from 'react';
type Mode='wave'|'fit'|'noise'|'decay';
const modes:Record<Mode,string>={wave:'波形观察站',fit:'地温拟合台',noise:'信号去噪屋',decay:'衰减实验室'};
export default function Lab({initial='wave',compact=false}:{initial?:Mode;compact?:boolean}) {
 const [mode,setMode]=useState<Mode>(initial),[frequency,setFrequency]=useState(2),[amplitude,setAmplitude]=useState(1),[slope,setSlope]=useState(30),[windowSize,setWindow]=useState(5),[decay,setDecay]=useState(0.8);
 const width=600,height=240,pad=40;
 const values=Array.from({length:241},(_,i)=>{const t=i/120;const clean=Math.sin(2*Math.PI*2*t);const noise=0.24*Math.sin(i*2.7)+0.12*Math.cos(i*1.17);return clean+noise;});
 const smooth=values.map((_,i)=>{const half=Math.floor(windowSize/2);const part=values.slice(Math.max(0,i-half),Math.min(values.length,i+half+1));return part.reduce((a,b)=>a+b,0)/part.length;});
 const transform=(x:number,y:number)=>[pad+x*(width-2*pad),mode==='fit'?height-pad-(y-14)/4*(height-2*pad):height/2-y*(height/2-pad)/1.6];
 const path=(fn:(i:number)=>number,n=241)=>Array.from({length:n},(_,i)=>{const [x,y]=transform(i/(n-1),fn(i));return `${i===0?'M':'L'}${x.toFixed(2)},${y.toFixed(2)}`;}).join(' ');
 const fitObserved=[15,15.3,15.6,15.9,16.2];
 const rmse=Math.sqrt(fitObserved.reduce((sum,y,i)=>sum+(y-(15+slope/1000*i*10))**2,0)/5);
 return <section className={'lab '+(compact?'compact':'')}>
 <div className="section-top"><div><span className="eyebrow">动手拖一拖 · 浏览器演示</span><h3>{modes[mode]}</h3></div><span className="pill">无需 MATLAB</span></div>
 {!compact&&<div className="segmented" aria-label="选择实验">{(Object.keys(modes) as Mode[]).map(m=><button key={m} className={mode===m?'active':''} onClick={()=>setMode(m)}>{modes[m]}</button>)}</div>}
 <div className="plot-box"><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${modes[mode]}实时曲线，参数变化后会更新`}>
 {[0,.25,.5,.75,1].map(f=><g key={f}><line x1={pad} x2={width-pad} y1={pad+f*(height-2*pad)} y2={pad+f*(height-2*pad)} stroke="#e2e8e2"/><line x1={pad+f*(width-2*pad)} x2={pad+f*(width-2*pad)} y1={pad} y2={height-pad} stroke="#e2e8e2"/><text x={pad+f*(width-2*pad)} y={height-18} textAnchor="middle" fontSize="11" fill="#737c76">{mode==='fit'?f*40:(f*2).toFixed(1)}</text></g>)}
 <line x1={pad} x2={pad} y1={pad} y2={height-pad} stroke="#a7b5ab"/><line x1={pad} x2={width-pad} y1={height-pad} y2={height-pad} stroke="#a7b5ab"/>
 <text x="16" y="25" fontSize="11" fill="#737c76">{mode==='fit'?'温度 °C':'振幅'}</text><text x="560" y="233" fontSize="11" fill="#737c76">{mode==='fit'?'深度 m':'时间 s'}</text>
 {mode==='fit'?<><path d={path(i=>15+slope/1000*(i/240*40))} stroke="#507e69" fill="none" strokeWidth="2.8"/>{fitObserved.map((y,i)=>{const [cx,cy]=transform(i/4,y);return <circle key={i} cx={cx} cy={cy} r="5" fill="#e9afba" stroke="#fff" strokeWidth="2"/>;})}{[14,15,16,17,18].map(y=><text key={y} x="31" y={transform(0,y)[1]+4} textAnchor="end" fontSize="11" fill="#737c76">{y}</text>)}</>:<>
 {[-1,0,1].map(y=><text key={y} x="30" y={transform(0,y)[1]+4} textAnchor="end" fontSize="11" fill="#737c76">{y}</text>)}
 {mode==='noise'&&<path d={path(i=>values[i])} stroke="#b6c4ca" fill="none" strokeWidth="1.5"/>}
 {mode==='decay'&&<><path d={path(i=>Math.exp(-decay*i/120))} stroke="#d0ad72" fill="none" strokeDasharray="5 5"/><path d={path(i=>-Math.exp(-decay*i/120))} stroke="#d0ad72" fill="none" strokeDasharray="5 5"/></>}
 <path d={path(i=>mode==='wave'?amplitude*Math.sin(2*Math.PI*frequency*i/120):mode==='noise'?smooth[i]:Math.exp(-decay*i/120)*Math.sin(2*Math.PI*3*i/120))} stroke="#54856e" fill="none" strokeWidth="2.5"/>
 </>}
 </svg></div>
 <div className="lab-controls">
 {mode==='wave'&&<><label>频率 <b>{frequency.toFixed(1)} Hz</b><input aria-label="频率" type="range" min="0.5" max="5" step="0.5" value={frequency} onChange={e=>setFrequency(+e.target.value)}/></label><label>振幅 <b>{amplitude.toFixed(1)}</b><input aria-label="振幅" type="range" min="0.2" max="1.4" step="0.1" value={amplitude} onChange={e=>setAmplitude(+e.target.value)}/></label></>}
 {mode==='fit'&&<label>地温梯度 <b>{slope} °C/km</b><input aria-label="地温梯度" type="range" min="0" max="60" step="1" value={slope} onChange={e=>setSlope(+e.target.value)}/></label>}
 {mode==='noise'&&<label>移动平均窗口 <b>{windowSize} 点</b><input aria-label="平滑窗口" type="range" min="1" max="31" step="2" value={windowSize} onChange={e=>setWindow(+e.target.value)}/></label>}
 {mode==='decay'&&<label>衰减系数 k <b>{decay.toFixed(1)} /s</b><input aria-label="衰减系数" type="range" min="0.1" max="2" step="0.1" value={decay} onChange={e=>setDecay(+e.target.value)}/></label>}
 </div>
 <p className="lab-insight" aria-live="polite">{mode==='wave'?`频率 ${frequency} Hz → 每秒 ${frequency} 个周期，周期约 ${(1/frequency).toFixed(2)} s。振幅控制高度，不改变周期。`:mode==='fit'?`教学数据的真实梯度为 30 °C/km。当前直线 RMSE = ${rmse.toFixed(3)} °C。试着让线贴近粉色观测点。`:mode==='noise'?`灰线是固定的含噪数据，绿线是 ${windowSize} 点移动平均。窗口增大后，注意峰值是否也被压低。`:`y = exp(−${decay.toFixed(1)}t) × sin(2π × 3t)。1 s 时包络约 ${Math.exp(-decay).toFixed(3)}。频率始终为 3 Hz。`}</p>
 <p className="micro">教学合成数据 · 在浏览器中计算，仅用于理解概念；MATLAB 实操请使用课程任务卡。</p>
 </section>;
}
