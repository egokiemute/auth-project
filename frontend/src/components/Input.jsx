const Input = ({ icon: Icon, label, ...props }) => {
	return (
		<div className='relative mb-6'>
			{/* Render the label if it exists */}
			{label && (
				<label className='block text-sm font-medium text-gray-800 mb-2'>
					{label}
				</label>
			)}
			<div className='relative'>
				{/* Icon container */}
				{Icon && (
					<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
						<Icon className='size-5 text-black' />
					</div>
				)}
				{/* Input field */}
				<input
					{...props}
					placeholder='' // Ensures no placeholder is displayed
					className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 bg-transparent bg-opacity-50 rounded-lg border border-black focus:border-gray-800 text-black placeholder-gray-400 transition duration-200`}
				/>
			</div>
		</div>
	);
};

export default Input;
