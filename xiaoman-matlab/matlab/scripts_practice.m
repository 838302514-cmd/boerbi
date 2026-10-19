% 把一次成功保存成脚本
% 教学合成数据，使用基础 MATLAB。
% 预期：均值 5；当前文件夹中有 first_result.mat。
sample = [3 5 7];
mean_value = mean(sample);
save('first_result.mat','sample','mean_value');
disp(fullfile(pwd,'first_result.mat'));
assert(mean_value == 5);
