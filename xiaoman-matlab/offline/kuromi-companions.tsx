// Original vector fan art, embedded in the offline bundle; no remote image dependencies.
function Character({kind=0}:{kind?:number}) {
 return <g stroke="#302539" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
  <path d="M65 132q-22 9-25 32 19-3 27-17m71-5q25 12 26-12l-10 3" fill="none"/>
  <path d="M67 113q-12 21-3 42l18 5 5-18 17 1 6 17 19-5q7-25-8-42" fill="#fffaff"/>
  <path d="M44 82Q28 52 44 36L27 7 66 26Q92 11 120 27l38-21-15 37q16 25 1 47l-15 25H62Z" fill="#302539"/>
  <circle cx="27" cy="7" r="7" fill="#302539"/><circle cx="158" cy="6" r="7" fill="#302539"/>
  <path d="M53 70q15-17 38-6 25-13 46 7l-3 28q-11 29-43 26-33 0-43-24Z" fill="#fffaff"/>
  <ellipse cx="70" cy="87" rx="4" ry="7" fill="#302539"/><ellipse cx="113" cy="87" rx="4" ry="7" fill="#302539"/>
  <path d="m66 81-5-4m55 5 6-5m-38 26q8 7 16-1" fill="none"/>
  <ellipse cx="91" cy="97" rx="4" ry="3" fill="#ef94b8" stroke="none"/>
  <ellipse cx="59" cy="101" rx="8" ry="4" fill="#efb7d0" stroke="none"/><ellipse cx="126" cy="101" rx="8" ry="4" fill="#efb7d0" stroke="none"/>
  <g fill="#ee9dc5" stroke="none"><path d="M79 40q0-12 13-12t13 12q0 7-6 9v7h-5v-5h-4v5h-5v-7q-6-2-6-9"/><circle cx="87" cy="40" r="3" fill="#302539"/><circle cx="98" cy="40" r="3" fill="#302539"/></g>
  <path d="m76 125 14 6 17-6v16l-17-5-14 5Z" fill={kind===1?'#bca1e3':'#e5a4ce'}/><circle cx="91" cy="133" r="4" fill="#c19adc"/>
 </g>;
}
export function Face({kind=0}:{kind?:number}) {return <svg className="face" viewBox="15 0 155 170" role="img" aria-label="酷洛米学习伙伴"><Character kind={kind}/></svg>;}
export function Friends({small=false}:{small?:boolean}) {return <svg className={small?'friends small':'friends'} viewBox="0 0 540 310" role="img" aria-label="酷洛米在紫色星空学习角观察 MATLAB 波形的原创同人插画">
 <defs><pattern id="kuromi-stars" width="44" height="44" patternUnits="userSpaceOnUse"><path d="m20 6 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" fill="#cbb7e1" opacity=".45"/></pattern></defs>
 <rect x="8" y="8" width="524" height="294" rx="30" fill="#ede3f6"/><rect x="8" y="8" width="524" height="294" rx="30" fill="url(#kuromi-stars)"/>
 <path d="M8 244q135-42 263 0 137-40 261-4v35q0 27-30 27H36Q8 302 8 275Z" fill="#d2bfe6"/>
 <path d="M445 38q-31 28 7 47-44 8-46-24-1-26 39-23" fill="#fff8d7"/>
 <g transform="translate(174 54) scale(1.12)"><Character/></g>
 <g transform="rotate(-8 110 170)" stroke="#7e6397" strokeWidth="2.5"><rect x="37" y="118" width="140" height="104" rx="12" fill="#fffaff"/><path d="M54 199v-61m0 61h107M58 171q12-43 25 0t25 0 25 0 25 0" fill="none"/><text x="65" y="244" fontSize="15" fill="#644c7d" stroke="none">y = sin(x)</text></g>
 <g transform="rotate(8 423 194)" stroke="#7e6397" strokeWidth="2.5"><rect x="370" y="151" width="113" height="80" rx="10" fill="#fffaff"/><path d="m385 211 21-16 23 3 36-30" fill="none"/><path d="m382 133 13-6 14 6v-17l-14 6-13-6Z" fill="#e5a4ce"/></g>
 <g fill="#826298"><path d="m342 45 4 10 10 4-10 4-4 10-4-10-10-4 10-4Z"/><path d="m81 67 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"/></g>
 <text x="270" y="283" textAnchor="middle" fill="#644c7d" fontSize="14">一起，把好奇心变成小小的超能力 ♡</text>
 </svg>;}
