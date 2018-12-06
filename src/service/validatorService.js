export const lengthRule = (min, max) => {
	return {
		min,
		max,
		message: `请输入${min}-${max}个字符`,
	};
};

export const requiredRule = () => {
	return {
		required: true,
		message: '请填写此字段',
	};
};
