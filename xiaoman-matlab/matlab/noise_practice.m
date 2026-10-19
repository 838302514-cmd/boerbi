% 从抖动里找到趋势
% 教学合成数据，使用基础 MATLAB。
% 预期：两条曲线长度相同；平滑曲线总体抖动减小。
rng(7);
t = linspace(0,2,201);
clean = sin(2*pi*2*t);
measured = clean + 0.2*randn(size(t));
smoothed = movmean(measured,9);
figure; plot(t,measured,':',t,smoothed,'LineWidth',1.3);
xlabel('Time (s)'); ylabel('Amplitude');
legend('Measured','Moving mean'); grid on;
assert(numel(smoothed)==201);
