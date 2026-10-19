% 用一条直线描述地温梯度
% 教学合成数据，使用基础 MATLAB。
% 预期：斜率 0.03°C/m，截距 15°C；100 m 处模型预测 18°C。
z = [0 10 20 30 40];
T = [15 15.3 15.6 15.9 16.2];
p = polyfit(z,T,1);
T_pred = polyval(p,z);
figure; plot(z,T,'o',z,T_pred,'-');
xlabel('Depth (m)'); ylabel('Temperature (C)'); grid on;
disp(p);
assert(abs(p(1)-0.03)<1e-9);
assert(abs(polyval(p,100)-18)<1e-9);
