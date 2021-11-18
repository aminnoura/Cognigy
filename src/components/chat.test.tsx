import React from 'react';
import { Provider } from 'react-redux';
import store from "../store";
import Chat from './Chat';
import { create } from 'react-test-renderer';
import { render, screen } from "@testing-library/react";

it('init status should not render submit button', async () => {
	const container = create(
			<Provider store={store}>
				<Chat status="INIT" />
			</Provider>,
	);
  const instance = container.root;
  const btn = instance.findAllByType('button');
  expect(btn.length).toEqual(0)
});

it('connected status should render submit button', async () => {
	const container = create(
			<Provider store={store}>
				<Chat status="CONNECTED" />
			</Provider>,
	);
  const instance = container.root;
  const btn = instance.findAllByType('button');
  expect(btn[0].children[0].children[0]).toBe("Submit")
});

it('connected status should not render a modal', async () => {
  window.HTMLElement.prototype.scrollIntoView = function() {};
  render(
			<Provider store={store}>
				<Chat status="CONNECTED" />
			</Provider>,
	);
  expect(await screen.queryByText("Something went wrong")).toBeNull();
});

it('error status should render a modal', async () => {
  window.HTMLElement.prototype.scrollIntoView = function() {};
  render(
			<Provider store={store}>
				<Chat status="ERROR" />
			</Provider>,
	);
  expect(await screen.queryByText("Something went wrong")).toBeTruthy();
});
