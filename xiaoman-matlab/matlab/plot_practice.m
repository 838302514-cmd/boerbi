% 画出你的第一条波形
% 教学合成数据，使用基础 MATLAB。
% 预期：一周期正弦曲线，最高点 1；生成 sine_practice.png。
x = linspace(0, 2*pi, 201);
y = sin(x);
figure; plot(x,y,'LineWidth',1.6);
xlabel('x (rad)'); ylabel('sin(x)');
title('One sine period'); grid on;
exportgraphics(gcf,'sine_practice.png');
assert(abs(max(y)-1) < 1e-9);
