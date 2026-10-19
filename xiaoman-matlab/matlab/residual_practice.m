% 拟合好不好，要看误差
% 教学合成数据，使用基础 MATLAB。
% 预期：残差为 [1 -1]；RMSE 为 1。
observed = [11 9];
predicted = [10 10];
residual = observed - predicted;
rmse_value = sqrt(mean(residual.^2));
assert(rmse_value == 1);
disp(rmse_value);
