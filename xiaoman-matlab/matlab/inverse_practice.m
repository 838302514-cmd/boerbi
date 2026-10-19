% 从衰减曲线反推一个参数
% 教学合成数据，使用基础 MATLAB。
% 预期：估计 k 接近 0.8（1/s），误差平方和接近 0。
t = linspace(0,3,61);
y = exp(-0.8*t);
loss = @(theta) sum((exp(-exp(theta)*t)-y).^2);
[theta_hat,J,flag] = fminsearch(loss,log(0.5));
k_hat = exp(theta_hat);
assert(abs(k_hat-0.8)<1e-3 && flag>0);
disp([k_hat J]);
