% 波的频率与采样
% 教学合成数据，使用基础 MATLAB。
% 预期：时间域有 5 个周期；频谱峰值在 5 Hz。
fs = 100; N = 100;
t = (0:N-1)/fs;
y = sin(2*pi*5*t);
Y = abs(fft(y))/N;
f = (0:N/2)*fs/N;
[~,idx] = max(Y(1:N/2+1));
peak_Hz = f(idx);
figure; plot(t,y); xlabel('Time (s)'); ylabel('Amplitude'); grid on;
assert(peak_Hz==5); disp(peak_Hz);
