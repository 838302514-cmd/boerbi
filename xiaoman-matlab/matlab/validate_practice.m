% 给模型一场小小的考试
% 教学合成数据，使用基础 MATLAB。
% 预期：理想线性教学数据的留出误差接近 0；真实数据一般不会如此完美。
z = [0 10 20 30 40]; T = [15 15.3 15.6 15.9 16.2];
p = polyfit(z(1:4),T(1:4),1);
held_out = polyval(p,z(5));
error_C = T(5)-held_out;
assert(abs(error_C)<1e-9);
disp(error_C);
