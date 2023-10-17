import { useRouter } from 'next/navigation';
import LoginForm from "../LoginForm";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

jest.mock('next/navigation', () => ({
          ...jest.requireActual('next/navigation'),
          useRouter: () => ({
                    push: jest.fn(),
                    replace: jest.fn(),
                    reload: jest.fn(),
                    back: jest.fn(),
                    prefetch: jest.fn(),
                    beforePopState: jest.fn(),
                    events: {
                              on: jest.fn(),
                              off: jest.fn(),
                    },
                    isFallback: false,
          }),
}));

const mockRouter = {
          push: jest.fn(),
};

// beforeEach(() => {
//           useRouter.mockReturnValue(mockRouter);
// });


const axiosMock = new MockAdapter(axios);


describe("Login Form", () => {
          beforeEach(() => {
                    // Render the LoginForm component before each test
                    render(<LoginForm />);
          });

          afterEach(() => {
                    // Reset the mock adapter after each test
                    axiosMock.reset();
          });

          test("Login Form Rendering", () => {
                    const headingElement = screen.getByRole("heading", {
                              name: "Login in",
                    });
                    expect(headingElement).toBeInTheDocument();

          })
          test("Displays validation errors for empty fields", async () => {
                    await act(() => {
                              fireEvent.click(screen.getByRole("button", { name: "Login" }));
                    });
                    expect(screen.getByText("Please Enter Your Email")).toBeInTheDocument();
                    expect(screen.getByText("Please Enter Your Password")).toBeInTheDocument();
          })


          test("Submits the form with valid data and successfully logs in", async () => {
                    axiosMock.onPost("https://devcamperserveapi.vercel.app/api/v1/auth/login").reply(200, {
                              success: true,
                              // token: "your_mocked_token_here",
                    });

                    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "monika@gmail.com" } });
                    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "Monika@00" } });

                    fireEvent.click(screen.getByRole("button", { name: "Login" }));

                    await waitFor(() => {
                              expect(axiosMock.history.post.length).toBe(1);
                              // expect(mockRouter.push).toHaveBeenCalledWith("/bootcamp");
                    });
          });

})
