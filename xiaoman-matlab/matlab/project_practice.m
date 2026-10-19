% 交付你的第一份小研究
% 教学合成数据，使用基础 MATLAB。
% 预期：斜率 0.03°C/m、截距 15°C、RMSE 接近 0；导出 CSV 与 PNG。
z = (0:10:40)'; T = [15;15.3;NaN;15.9;16.2];
valid = ~isnan(z) & ~isnan(T); z=z(valid); T=T(valid);
p=polyfit(z,T,1); predicted=polyval(p,z);
rmse_value=sqrt(mean((T-predicted).^2));
R=table(z,T,predicted,'VariableNames',{'depth_m','temperature_C','predicted_C'});
writetable(R,'temperature_results.csv');
figure; plot(z,T,'o',z,predicted,'-','LineWidth',1.5);
xlabel('Depth (m)'); ylabel('Temperature (C)'); grid on;
exportgraphics(gcf,'temperature_fit.png');
assert(abs(p(1)-0.03)<1e-9 && rmse_value<1e-9);
disp([p rmse_value]);
