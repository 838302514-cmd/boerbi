% 缺失值和异常值，不是一回事
% 教学合成数据，使用基础 MATLAB。
% 预期：保留深度 [0 20 30]，温度均值约 11.667。
x = [0 10 20 30];
y = [10 NaN 12 13];
valid = ~isnan(x) & ~isnan(y);
x_clean = x(valid); y_clean = y(valid);
assert(numel(y_clean)==3);
assert(all(x_clean == [0 20 30]));
disp(mean(y_clean));
