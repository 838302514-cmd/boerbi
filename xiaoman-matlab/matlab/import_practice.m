% 读入一份小小的测量表
% 教学合成数据，使用基础 MATLAB。
% 预期：生成 temperature_demo.csv；读取后有 5 行数据。
T = table((0:10:40)',[15;15.3;15.6;15.9;16.2], ...
 'VariableNames',{'depth_m','temperature_C'});
writetable(T,'temperature_demo.csv');
R = readtable('temperature_demo.csv');
disp(head(R));
assert(height(R)==5);
