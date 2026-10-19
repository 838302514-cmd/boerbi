% 把问题说清楚，再检查答案
% 教学合成数据，使用基础 MATLAB。
% 预期：速度为 2000 m/s。
distance_m = 100;
time_ms = 50;
time_s = time_ms / 1000;
velocity_m_s = distance_m / time_s;
assert(abs(velocity_m_s - 2000) < 1e-9);
disp(velocity_m_s);
