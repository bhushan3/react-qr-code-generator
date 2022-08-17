import QRCode from 'qrcode'
import { useState } from 'react'

function App() {
	const [text, setText] = useState('')
	const [size, setSize] = useState(300)
	const [qrCode, setQrCode] = useState('')
	const [loading, setLoading] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')

	const onClickButton = async e => {
		e.preventDefault()
		if (text) {
			setErrorMessage('')
			setLoading(true)
			await QRCode.toDataURL(text, { margin: 0, errorCorrectionLevel: 'H', width: size }, function (error, url) {
				if (error) setErrorMessage('Unable to generate QR Code')
				setQrCode(url)
				setLoading(false)
			})
		} else {
			setQrCode('')
			setLoading(false)
			setErrorMessage('Please enter text for QR Code')
		}
	}

	return (
		<div className='grid h-screen place-items-center py-9'>
			<div className='max-w-md'>
				<h1 className='text-4xl font-bold mb-4 uppercase'>
					QR Code <small className='block text-3xl font-normal'>Generator</small>
				</h1>
				<p className='my-4'>QR Codes allow smartphone users to access your website simply and quickly.</p>
				<p className='my-4'>Enter your URL below to generate a QR Code and download the image.</p>
				<input
					className='my-4 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
					onChange={e => setText(e.target.value)}
					placeholder='Type your text here'
				/>
				<select
					className='my-4 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
					defaultValue={300}
					onChange={e => setSize(e.target.value)}>
					<option value='100'>100x100</option>
					<option value='200'>200x200</option>
					<option value='300'>300x300</option>
					<option value='400'>400x400</option>
					<option value='500'>500x500</option>
					<option value='600'>600x600</option>
					<option value='700'>700x700</option>
				</select>
				{errorMessage && <p className='my-4 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4'>{errorMessage}</p>}
				<button className='block my-4 w-full py-2 px-4 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' onClick={onClickButton}>
					Generate
				</button>
				{qrCode && (
					<div className='reuslt'>
						{loading ? (
							<div role='status'>
								<svg aria-hidden='true' class='mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
									<path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor'></path>
									<path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentFill'></path>
								</svg>
								<span class='sr-only'>Loading...</span>
							</div>
						) : (
							<>
								<img className='mx-auto' src={qrCode} alt={`QR Code for "${text}"`} />
								<a className='my-4 block text-center w-full py-2 px-4 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' href={qrCode} download='qr-code'>
									Download
								</a>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default App
