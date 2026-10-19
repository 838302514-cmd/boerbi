import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: '筱蔓的 MATLAB 探险手账 · 从零出发', description: '图解课程、互动实验与即时练习，陪零基础的你用 Codex 和 MATLAB 探索工程问题。', icons:{icon:'/favicon.svg'} };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="zh-CN"><body>{children}</body></html>; }
