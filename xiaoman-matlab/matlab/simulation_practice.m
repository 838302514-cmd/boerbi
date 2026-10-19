% 模拟一段会变弱的波
% 教学合成数据，使用基础 MATLAB。
% 预期：波形在上下包络内振动；增大 k 后包络下降更快。
t = linspace(0,3,601); A=1; k=0.8; f=3;
E = A*exp(-k*t);
y = E.*sin(2*pi*f*t);
assert(all(abs(y)<=E+1e-12));
figure; plot(t,y,t,E,'--',t,-E,'--');
xlabel('Time (s)'); ylabel('Amplitude');
legend('Wave','Upper envelope','Lower envelope'); grid on;
