% Runs every educational example and each built-in assertion.
verifyFolder = fileparts(mfilename('fullpath'));
verifyFiles = {'hello_practice.m','connect_practice.m','ask_practice.m','arrays_practice.m','plot_practice.m','scripts_practice.m','import_practice.m','clean_practice.m','noise_practice.m','fit_practice.m','residual_practice.m','validate_practice.m','objective_practice.m','search_practice.m','inverse_practice.m','sampling_practice.m','simulation_practice.m','project_practice.m'};
verifyNames = cell(size(verifyFiles));
verifyPassed = false(size(verifyFiles));
verifyMessages = cell(size(verifyFiles));
for verifyIndex=1:numel(verifyFiles)
 try
  run(fullfile(verifyFolder,verifyFiles{verifyIndex}));
  verifyPassed(verifyIndex)=true;
  verifyMessages{verifyIndex}='Assertions passed';
 catch verifyError
  verifyMessages{verifyIndex}=verifyError.message;
 end
 verifyNames{verifyIndex}=verifyFiles{verifyIndex};
end
verification = table(verifyNames',verifyPassed',verifyMessages','VariableNames',{'script','passed','message'});
disp(verification);
writetable(verification,fullfile(verifyFolder,'verification.csv'));
assert(all(verifyPassed),'Some lesson scripts failed');
