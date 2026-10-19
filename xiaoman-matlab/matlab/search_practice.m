% 让 MATLAB 自动找参数
% 教学合成数据，使用基础 MATLAB。
% 预期：best_k 接近 3，best_J 接近 0，exitflag 为正。
fun = @(k) (k-3).^2;
[best_k,best_J,exitflag] = fminsearch(fun,0);
assert(abs(best_k-3)<1e-3);
assert(best_J<1e-6 && exitflag>0);
disp([best_k best_J exitflag]);
