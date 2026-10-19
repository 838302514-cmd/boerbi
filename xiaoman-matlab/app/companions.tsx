export function Friends({small=false}:{small?:boolean}) {
 return <svg className={small?'friends small':'friends'} viewBox="0 0 540 310" role="img" aria-label="吉伊卡哇风格的白色小伙伴、蓝耳小猫和黄色兔子一起观察波形与山丘的手绘插画">
 <defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#a4b8a8" opacity=".3"/></pattern></defs>
 <rect x="8" y="8" width="524" height="294" rx="30" fill="#edf3dc"/>
 <rect x="8" y="8" width="524" height="294" rx="30" fill="url(#dots)"/>
 <path d="M10 218 Q110 156 232 216 Q372 155 531 208 V275 Q530 302 502 302 H38 Q8 302 8 275Z" fill="#d1e3c0"/>
 <path d="M10 259 Q112 205 280 261 Q420 215 532 252 V280 Q532 302 505 302 H36 Q8 302 8 279Z" fill="#b7cfac"/>
 <g fill="none" stroke="#58655a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M53 81h87v61H53z" fill="#fffcf0" transform="rotate(-7 96 111)"/>
 <path d="M66 126v-33m0 33h60m-55-14q8-28 17-3t17-4 17 0" stroke="#7d9d8d"/>
 <path d="M384 46q36-26 75 1q10 17-1 34h-50l-15 15 3-19q-20-8-12-31" fill="#fffdf5"/>
 <path d="M400 65l12-9 11 11 17-15" stroke="#b5a0c0"/>
 <path d="M445 40l3-8m9 11 7-5M46 174l-5-8m12 5 1-8"/>
 </g>
 <g stroke="#655b54" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
 <g transform="translate(199 102)">
 <path d="M8 92Q-3 61 10 42Q-3 15 13 8Q30 2 34 30Q54 22 72 30Q75 4 91 8Q106 14 94 42Q109 64 98 92Q112 111 97 123L90 137Q74 143 67 132H39Q32 144 17 137L10 123Q-5 109 8 92Z" fill="#fffdf6"/>
 <ellipse cx="23" cy="73" rx="13" ry="7" fill="#f4c0be" stroke="none"/><ellipse cx="83" cy="73" rx="13" ry="7" fill="#f4c0be" stroke="none"/>
 <ellipse cx="35" cy="61" rx="3.8" ry="5" fill="#594f4a" stroke="none"/><ellipse cx="70" cy="61" rx="3.8" ry="5" fill="#594f4a" stroke="none"/>
 <path d="M44 75q8 8 16 0m-10 4 2 5 3-5" fill="none"/><path d="M12 107l15 4m63-4-14 4"/>
 </g>
 <g transform="translate(88 134) rotate(-8 50 70)">
 <path d="M9 68Q-1 42 14 29L10 0 40 18Q56 13 72 20L97 7 92 36Q105 57 92 79L89 111Q75 127 64 114H35Q20 127 10 112Z" fill="#fffdf5"/>
 <path d="M12 3l28 17-25 15M96 9 73 21l18 15" fill="#97c3db" stroke="none"/>
 <path d="M32 51v8m35-8v8m-25 11q10 10 18 0" fill="none"/>
 <ellipse cx="23" cy="67" rx="10" ry="6" fill="#efb6ba" stroke="none"/><ellipse cx="77" cy="67" rx="10" ry="6" fill="#efb6ba" stroke="none"/>
 <path d="M19 86l19 5m42-6-14 7" fill="none"/><path d="M30 92l34-2 1 26-34 2Z" fill="#a8c8ac"/>
 </g>
 <g transform="translate(324 103) rotate(7 50 70)">
 <path d="M12 79Q0 57 17 40Q1-8 15-22Q31-29 37 36Q48 31 61 36Q68-27 84-22Q101-14 84 43Q101 57 91 80L91 115Q79 131 66 117H37Q20 132 9 115Z" fill="#f6dfa0"/>
 <path d="M20 0l8 31m48-31-7 31" stroke="#e7af9b" strokeWidth="5"/>
 <path d="M32 63l7 2m29-2-7 2m-17 12 8 6 7-6m-8 6v6" fill="none"/>
 <ellipse cx="24" cy="77" rx="10" ry="6" fill="#edb49d" stroke="none"/><ellipse cx="79" cy="77" rx="10" ry="6" fill="#edb49d" stroke="none"/>
 <path d="M10 95l-13-12m93 12 13-14" fill="none"/>
 </g>
 </g>
 <g fill="#fff9e6"><path d="m48 241 3-8 3 8 8 3-8 3-3 8-3-8-8-3Z"/><path d="m455 225 4-10 4 10 10 4-10 4-4 10-4-10-10-4Z"/></g>
 <text x="354" y="286" fontSize="13" fill="#526b54" fontFamily="sans-serif">一起，慢慢变厉害。</text>
 </svg>;
}
export function Face({kind=0}:{kind?:number}) { return <svg viewBox="0 0 60 60" role="img" aria-label={['白色学习伙伴','蓝耳学习伙伴','兔子学习伙伴'][kind%3]} className="face"><g stroke="#6c625a" strokeWidth="1.8" strokeLinecap="round"><path d={kind%3===2?'M14 30Q4 0 14 2L23 25H36Q44 0 51 3L46 31Q57 55 30 56Q2 55 14 30Z':kind%3===1?'M9 27 9 8 25 21H35L51 8V29Q61 53 31 56Q0 54 9 27Z':'M10 26Q1 9 14 9Q22 7 24 22H37Q39 6 49 10Q59 15 49 28Q58 54 30 56Q1 55 10 26Z'} fill={kind%3===2?'#f8dfa0':'#fffdf6'}/>{kind%3===1&&<path d="m11 12 12 11-12 5m38-16-12 11 12 5" fill="#a7c9e0" stroke="none"/>}<path d="M21 35v3m18-3v3m-13 7q4 4 8 0" fill="none"/><ellipse cx="15" cy="43" rx="5" ry="3" fill="#f0c2bf" stroke="none"/><ellipse cx="45" cy="43" rx="5" ry="3" fill="#f0c2bf" stroke="none"/></g></svg>; }
