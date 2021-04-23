import useForceHttps, { checkStatus, ForceHttpsStatus } from '.';
import { renderHook, act } from '@testing-library/react-hooks/dom'
import { URL } from 'whatwg-url';

describe('force-https', () => {
	describe('useForceHttps', () => {
		const mockUrl = (new_url : string, mockReplace : (url:string)=>void) => {
			const value : typeof window.location = new URL(new_url) as any;
			value.replace = mockReplace;
			delete (window as Partial<Window>).location;
			window.location = value;
		}

		it('should redirect http to https when status is All', () => {
			const mockReplace = jest.fn();
			mockUrl("http://example.com/", mockReplace);
			const { result } = renderHook(() => useForceHttps('all'))
			act(() => {});
			expect(mockReplace).toBeCalledWith("https://example.com/");
		});

		it('should redirect http to https when status is Dave', () => {
			const mockReplace = jest.fn();
			mockUrl("http://example.com/", mockReplace);
			const { result } = renderHook(() => useForceHttps('dave'))
			act(() => {});
			expect(mockReplace).toBeCalledWith("https://example.com/");
		});

		it('should not redirect http to https when status is false', () => {
			const mockReplace = jest.fn();
			mockUrl("http://eaxmple.com/", mockReplace);
			const { result } = renderHook(() => useForceHttps('false'))
			act(() => {});
			expect(mockReplace).not.toHaveBeenCalled();
		});

		it('should not redirect when its allready https', () => {
			const mockReplace = jest.fn();
			mockUrl("https://eaxmple.com/", mockReplace);
			const { result } = renderHook(() => useForceHttps('all'))
			act(() => {});
			expect(mockReplace).not.toHaveBeenCalled();
		});
	});

	describe('checkStatus', () => {
		it('Status "False", with its aliases', () => {
			expect(checkStatus("")).toBe(ForceHttpsStatus.False);
			expect(checkStatus(false)).toBe(ForceHttpsStatus.False);
			expect(checkStatus("ouwrgworugn")).toBe(ForceHttpsStatus.False);
		});
		it('Status "dave", with its aliases', () => {
			expect(checkStatus("true")).toBe(ForceHttpsStatus.Dave);
			expect(checkStatus(true)).toBe(ForceHttpsStatus.Dave);
			expect(checkStatus("dave")).toBe(ForceHttpsStatus.Dave);
		});
		it('Status "all", in any casing', () => {
			expect(checkStatus("all")).toBe(ForceHttpsStatus.All);
			expect(checkStatus("All")).toBe(ForceHttpsStatus.All);
			expect(checkStatus("ALL")).toBe(ForceHttpsStatus.All);
		});
	});
});
