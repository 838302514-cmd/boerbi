% 一串测量值，就是一个数组
% 教学合成数据，使用基础 MATLAB。
% 预期：平方数组为 [0 100 400 900]。
depth_m = [0 10 20 30];
depth_squared = depth_m.^2;
assert(depth_m(2) == 10);
disp(depth_squared);
