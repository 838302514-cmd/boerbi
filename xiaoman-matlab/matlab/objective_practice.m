% 把“更好”写成一个数字
% 教学合成数据，使用基础 MATLAB。
% 预期：best_k 为 3，最小目标值为 0。
k = 1:5;
J = (k-3).^2;
[min_value,idx] = min(J);
best_k = k(idx);
assert(best_k==3 && min_value==0);
disp(best_k);
